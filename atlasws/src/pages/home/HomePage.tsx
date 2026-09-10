import React, { useEffect } from "react";
import { Lang } from "../../i18n/types";
import { dictFor } from "../../i18n/useLang";
import { MstHeader } from "../../components/mst/MstHeader";
import { MstFooter } from "../../components/mst/MstFooter";
import { Hero } from "./sections/Hero";
import { Pattern } from "./sections/Pattern";
import { Thesis } from "./sections/Thesis";
import { Stack } from "./sections/Stack";
import { Production } from "./sections/Production";
import { Ladder } from "./sections/Ladder";
import { RecordToAction } from "./sections/RecordToAction";
import { Horizons } from "./sections/Horizons";
import { Builders } from "./sections/Builders";
import { Contact } from "./sections/Contact";

interface Props { lang: Lang }

export const HomePage: React.FC<Props> = ({ lang }) => {
  const dict = dictFor(lang);

  useEffect(() => {
    document.documentElement.dataset.theme = "modernist";
    return () => { delete document.documentElement.dataset.theme; };
  }, []);

  return (
    <div className="mst">
      <MstHeader dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} />
        <Pattern dict={dict} />
        <Thesis dict={dict} />
        <Stack dict={dict} />
        <Production dict={dict} />
        <Ladder dict={dict} />
        <RecordToAction dict={dict} />
        <Horizons dict={dict} />
        <Builders dict={dict} />
        <Contact dict={dict} />
      </main>
      <MstFooter dict={dict} />
    </div>
  );
};

export default HomePage;
