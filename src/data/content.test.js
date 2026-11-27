import { describe, expect, it } from "vitest";
import { projects } from "./projects";
import { certificates } from "./certificates";
import { skillGroups } from "./skills";

describe("Portfolio content invariants", () => {
  it("contains exactly three specified projects", () => {
    expect(projects.map((project) => project.name)).toEqual([
      "AIRMESH",
      "PixelShrink",
      "NexSight",
    ]);
  });

  it("AIRMESH description mentions alerts and notifications", () => {
    const airmesh = projects.find((project) => project.name === "AIRMESH");
    expect(airmesh?.description.toLowerCase()).toContain("alerts");
    expect(airmesh?.description.toLowerCase()).toContain("notifications");
  });

  it("contains exactly four verified certificates", () => {
    expect(certificates).toHaveLength(4);
  });

  it("contains five technical skill groups without fake ratings", () => {
    expect(skillGroups).toHaveLength(5);
  });
});

