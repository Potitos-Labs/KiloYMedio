interface Props {
  children: JSX.Element | JSX.Element[];
}
import Header from "./Header";
export default function Layout({ children }: Props) {
  return (
    <div>
      <Header></Header>
      <main>{children}</main>
    </div>
  );
}
