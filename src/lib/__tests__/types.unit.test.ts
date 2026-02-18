import { describe, expect, it } from "bun:test";
import { createDefaultResume, TEMPLATES } from "../types";
import type { ResumeData, TemplateName } from "../types";

describe("Resume Types — Unit Tests", () => {
  describe("createDefaultResume", () => {
    it("returns a valid ResumeData object", () => {
      const resume = createDefaultResume();
      expect(resume.personal.fullName).toBe("");
      expect(resume.personal.email).toBe("");
      expect(resume.template).toBe("clean-modern");
      expect(resume.paperSize).toBe("a4");
    });

    it("includes one empty experience entry", () => {
      const resume = createDefaultResume();
      expect(resume.experience).toHaveLength(1);
      expect(resume.experience[0].company).toBe("");
      expect(resume.experience[0].bullets).toEqual([""]);
    });

    it("includes one empty education entry", () => {
      const resume = createDefaultResume();
      expect(resume.education).toHaveLength(1);
      expect(resume.education[0].school).toBe("");
    });

    it("starts with empty skills and certifications", () => {
      const resume = createDefaultResume();
      expect(resume.skills).toEqual([]);
      expect(resume.certifications).toEqual([]);
      expect(resume.languages).toEqual([]);
      expect(resume.projects).toEqual([]);
    });

    it("has optional sections hidden by default", () => {
      const resume = createDefaultResume();
      expect(resume.showCertifications).toBe(false);
      expect(resume.showLanguages).toBe(false);
      expect(resume.showProjects).toBe(false);
    });

    it("generates unique IDs for experience and education", () => {
      const a = createDefaultResume();
      const b = createDefaultResume();
      expect(a.experience[0].id).not.toBe(b.experience[0].id);
      expect(a.education[0].id).not.toBe(b.education[0].id);
    });
  });

  describe("TEMPLATES", () => {
    it("contains 6 templates", () => {
      expect(TEMPLATES).toHaveLength(6);
    });

    it("has unique IDs for each template", () => {
      const ids = TEMPLATES.map((t) => t.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("includes both free and premium templates", () => {
      const free = TEMPLATES.filter((t) => !t.premium);
      const premium = TEMPLATES.filter((t) => t.premium);
      expect(free.length).toBeGreaterThan(0);
      expect(premium.length).toBeGreaterThan(0);
    });

    it("has clean-modern as first template", () => {
      expect(TEMPLATES[0].id).toBe("clean-modern");
    });
  });
});
