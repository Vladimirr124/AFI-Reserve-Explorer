"use client";

import { BookOpen } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { buttonVariants } from "@/components/ui/button";
import { GLOSSARY, SOURCES } from "@/data/afi";
import { cn } from "@/lib/utils";

export function SourceDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon-lg" }),
          "fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full border-border/80 bg-background/95 shadow-lg ring-1 ring-foreground/10 backdrop-blur"
        )}
        aria-label="Open glossary and sources"
      >
        <BookOpen className="size-5" />
      </DrawerTrigger>
      <DrawerContent className="h-full max-h-[100dvh] sm:max-w-md">
        <DrawerHeader>
          <DrawerTitle>Glossary & sources</DrawerTitle>
          <DrawerDescription>
            Definitions used on this page and pointers to primary materials.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 space-y-8 overflow-y-auto px-4 pb-6">
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Glossary
            </h3>
            <dl className="space-y-4">
              {GLOSSARY.map((g) => (
                <div key={g.term}>
                  <dt className="text-sm font-medium text-foreground">
                    {g.term}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {g.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Sources
            </h3>
            <ul className="space-y-3 text-sm">
              {SOURCES.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {s.title}
                  </a>
                  {s.note ? (
                    <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
