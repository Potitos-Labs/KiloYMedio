import ProfileHeader from "./ProfileHeader";

function AdminHeader() {
  return (
    <nav
      className="
        navbar-expand-lg
        navbar-light navbar
        relative
        flex
        items-center
        justify-between px-6
      "
    >
      <div className="flex flex-row">
        <ProfileHeader />
      </div>
    </nav>
  );
}

export default AdminHeader;
