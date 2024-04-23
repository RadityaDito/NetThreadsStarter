import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-1 items-center justify-center">
      <SignIn />
    </div>
  );
}
