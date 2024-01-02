import React from "react";
import { useTranslation } from "react-i18next";

const ChartPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <section className="container page">
        <h1>{t("general.construction")}</h1>
      </section>
    </div>
  );
};

export default ChartPage;
