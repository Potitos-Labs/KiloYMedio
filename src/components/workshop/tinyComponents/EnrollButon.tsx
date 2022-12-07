import { trpc } from "@utils/trpc";

function EnrollButton({ OnsiteworkshopID }: { OnsiteworkshopID: string }) {
  const utils = trpc.useContext();
  const { data: areEnroll } = trpc.workshop.isEnroll.useQuery({
    onSiteWorkshopId: OnsiteworkshopID,
  });
  console.log(areEnroll);
  const { mutateAsync: enroll } = trpc.user.client.enrollWorkshop.useMutation({
    onSuccess() {
      utils.workshop.getWorkshopsParticipants.invalidate();
      utils.workshop.isEnroll.invalidate();
    },
  });
  const { mutateAsync: unenroll } =
    trpc.user.client.unenrollWorkshop.useMutation({
      onSuccess() {
        utils.workshop.getWorkshopsParticipants.invalidate();
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
    <button onClick={() => whorshopfunction()}>
      {areEnroll ? "Desinscribirse" : "Inscribirse"}
    </button>
  );
}
export default EnrollButton;
