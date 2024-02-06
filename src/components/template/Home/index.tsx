import ContainerDashboard from "@/components/molecules/ContainerDashboard";
import { usePathTranslations } from "@/hooks/use-path-translations";

const Home = () => {
  const { any } = usePathTranslations("metadata.dashboard.home");
  return (
    <ContainerDashboard>
      <div className="p-6 w-full h-full flex flex-col justify-center items-center gap-4 bg-gray-500">
        Home
      </div>
    </ContainerDashboard>
  );
};

export default Home;
