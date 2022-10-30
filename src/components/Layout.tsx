import Header from "./Header";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header></Header>
      <main>{children}</main>
    </div>
  );
}
