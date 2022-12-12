import { trpc } from "@utils/trpc";

import { toast } from "react-toastify";

function EnrollButton({
  OnsiteworkshopID,
  OnsiteWorkshopName,
}: {
  OnsiteworkshopID: string;
  OnsiteWorkshopName: string;
}) {
  const utils = trpc.useContext();

  const { data: areEnroll } = trpc.workshop.isEnroll.useQuery({
    onSiteWorkshopId: OnsiteworkshopID,
  });

  console.log(areEnroll);

  const { mutateAsync: enroll } = trpc.user.client.enrollWorkshop.useMutation({
    onSuccess() {
      toast.success(
        "¡Esperamos verle en el taller " + OnsiteWorkshopName + "!",
      );
      utils.workshop.getWorkshopsParticipants.invalidate();
      utils.workshop.isEnroll.invalidate();
    },
  });

  const { mutateAsync: unenroll } =
    trpc.user.client.unenrollWorkshop.useMutation({
      onSuccess() {
        utils.workshop.getWorkshopsParticipants.invalidate();
        utils.user.client.getEnrollWorkshops.invalidate();
        utils.workshop.isEnroll.invalidate();
      },
    });

  function whorshopfunction() {
    if (areEnroll) {
      unenroll({ onSiteWorkshopId: OnsiteworkshopID });
    }
    if (!areEnroll) {
      enroll({ onSiteWorkshopId: OnsiteworkshopID });
    }
  }
  return (
    <button
      className={` 
       absolute right-2 bottom-2 rounded-full border-[1px] border-base-content bg-transparent  px-2  active:border-primary active:bg-primary active:text-background`}
      onClick={() => whorshopfunction()}
    >
      {areEnroll ? "Desinscribirse" : "Inscribirse"}
    </button>
  );
}
export default EnrollButton;
