import DetailIndicator from "@/components/template/DetailIndicators";
import DetailLeads from "@/components/template/DetailLeads";
import ListLeads from "@/components/template/ListLeads";
import ListNewLeads from "@/components/template/ListNewLeades";
import { ParamsProp } from "@/types/general";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: ParamsProp;
}) {
  const meta = await getTranslations({
    locale,
    namespace: "metadata.dashboard.profile",
  });
  return {
    title: meta("title"),
    description: meta("description"),
  };
}

const page = ({ params: { id } }: { params: { id: string } }) => {
  return <DetailLeads id={id}/>;
};

export default page;
