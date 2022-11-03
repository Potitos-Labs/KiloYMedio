import CartHeader from "./CartHeader";
import ProfileHeader from "./ProfileHeader";

function ClientHeader() {
  return (
    <nav
      className="
        navbar
        navbar-expand-lg navbar-light
        relative
        flex
        items-center
        justify-between px-6
      "
    >
      <div className="flex flex-row">
        <CartHeader />
        <ProfileHeader />
      </div>
    </nav>
  );
}

export default ClientHeader;
