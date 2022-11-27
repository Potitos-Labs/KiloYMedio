import Link from "next/link";
import Image from "next/image";
function AdminPage() {
  return (
    <div className="bg-accent">
      <div className="flex justify-between pr-14">
        <div className="z-10 mx-10 mt-20  flex w-48 flex-col gap-6 sm:mt-28">
          <Link href="/admin/register">
            <button className="rounded-full bg-base-100  py-3 font-satoshiBold text-xs text-base-content">
              registrar usuario
            </button>
          </Link>
          <Link href="/product/create">
            <button className="rounded-full bg-base-100  py-3 font-satoshiBold text-xs text-base-content">
              crear producto
            </button>
          </Link>
          <Link href="/workshops/create">
            <button className="rounded-full bg-base-100  py-3 font-satoshiBold text-xs text-base-content">
              crear taller
            </button>
          </Link>
        </div>
        <Image
          src="/img/fondoCucharasSinFondo.png"
          width="700"
          height="400"
          alt="notfound"
        />
      </div>
    </div>
  );
}

export default AdminPage;
