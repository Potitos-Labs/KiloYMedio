import { trpc } from "@utils/trpc";

function EnrollButton({
  workshopID,
  places,
}: {
  workshopID: string;
  places: number;
}) {
  const utils = trpc.useContext();
  const areEnroll = trpc.workshop.isEnroll.useQuery({
    onSiteWorkshopId: workshopID,
  });

  const { mutateAsync: enroll } = trpc.user.client.enrollWorkshop.useMutation({
    onSuccess() {
      utils.workshop.getWorkshopsParticipants.invalidate();
    },
  });
  const { mutateAsync: unenroll } =
    trpc.user.client.unenrollWorkshop.useMutation({
      onSuccess() {
        utils.workshop.getWorkshopsParticipants.invalidate();
      },
    });

  function whorshopfunction() {
    if (!areEnroll) unenroll({ onSiteWorkshopId: workshopID });
    if (areEnroll && places < 50) {
      enroll({ onSiteWorkshopId: workshopID });
    }
  }
  return (
    <button onClick={whorshopfunction}>
      {" "}
      {areEnroll ? "Desinscribirse" : "inscribirse"}{" "}
    </button>
  );
}
export default EnrollButton;
