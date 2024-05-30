import CoverParticles from "@/components/cover-particles"
import Introduction from "@/components/introduction";
import TransitionsPage from "@/components/transitions-page";

export default function Home() {
  return (
    <main>

      <TransitionsPage/>
      <div className="flex min-h-[100vh] bg-gradient-cover">
        <CoverParticles>
        </CoverParticles>
        <Introduction/>
      </div>
    </main>
  );
}
