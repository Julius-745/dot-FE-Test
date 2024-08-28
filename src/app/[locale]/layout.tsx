import React from "react";
import type { Metadata } from "next";
import { Providers } from "../providers";
import { Navbar } from "@/_component";
import { Box } from "@chakra-ui/react";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { locales } from "../../../i18n.config";
import { NextIntlClientProvider } from "next-intl";

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: "metadata",
  } as Metadata);

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Box>
              <Navbar />
              {children}
            </Box>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
