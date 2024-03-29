import ListConfirmedLeads from "@/components/template/ListConfirmedLeads";
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

const page = () => {
  return <ListConfirmedLeads />;
};

export default page;
