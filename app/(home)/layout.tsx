import Header from "./Header";

export const dynamic = "force-static";

export default async function HomeLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
