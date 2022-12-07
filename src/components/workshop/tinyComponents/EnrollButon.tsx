import { trpc } from "@utils/trpc";

function EnrollButton({
  OnsiteworkshopID,
  places,
}: {
  OnsiteworkshopID: string;
  places: number;
}) {
  const utils = trpc.useContext();
  const areEnroll = trpc.workshop.isEnroll.useQuery({
    onSiteWorkshopId: OnsiteworkshopID,
  });
  console.log(areEnroll.data);
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
      enroll({ onSiteWorkshopId: OnsiteworkshopID });
      console.log("culo");
    }
    if (!areEnroll.data && places < 50) {
      unenroll({ onSiteWorkshopId: OnsiteworkshopID });
    }
  }
  return (
    <button onClick={() => whorshopfunction()}>
      {!areEnroll ? "Desinscribirse" : "Inscribirse"}
    </button>
  );
}
export default EnrollButton;
