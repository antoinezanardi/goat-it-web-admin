import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import type { MountSuspendedOptions } from "~~/tests/unit/utils/types/mount.types";

import type { UIcon, UTooltip } from "#components";
import { QuestionSourceUrlTag } from "#components";

import type { QuestionSourceUrlTagProperties } from "~/components/domain/question/QuestionFormModal/QuestionForm/QuestionSourceUrlsInput/QuestionSourceUrlTag/question-source-url-tag.types";

describe("QuestionSourceUrlTag Component", () => {
  let wrapper: VueWrapper;

  const defaultProperties: QuestionSourceUrlTagProperties = {
    url: "https://docs.google.com/spreadsheets/d/abc123",
  };

  async function mountQuestionSourceUrlTagComponent(options: MountSuspendedOptions<typeof QuestionSourceUrlTag> = {}): Promise<VueWrapper> {
    return mountSuspended(QuestionSourceUrlTag, {
      props: defaultProperties,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountQuestionSourceUrlTagComponent();
  });

  it("should render the question source url tag component when mounted.", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Tooltip", () => {
    it("should display the full URL in the tooltip text when rendered.", () => {
      const tooltip = wrapper.findComponent<typeof UTooltip>({ name: "UTooltip" });

      expect(tooltip.props("text")).toBe("questions.sourceUrlTag.goTo");
    });
  });

  describe("Link", () => {
    it("should set the href to the full URL when rendered.", () => {
      const link = wrapper.find("a");

      expect(link.attributes("href")).toBe("https://docs.google.com/spreadsheets/d/abc123");
    });

    it("should open in a new tab when rendered.", () => {
      const link = wrapper.find("a");

      expect(link.attributes("target")).toBe("_blank");
    });

    it("should set rel to noopener noreferrer when rendered.", () => {
      const link = wrapper.find("a");

      expect(link.attributes("rel")).toBe("noopener noreferrer");
    });

    it("should display the domain without www prefix when the URL contains www.", async() => {
      wrapper = await mountQuestionSourceUrlTagComponent({
        props: { url: "https://www.example.com/page" },
      });

      const link = wrapper.find("a");

      expect(link.text()).toContain("example.com");
    });

    it("should display the full hostname when the URL has subdomains.", () => {
      const link = wrapper.find("a");

      expect(link.text()).toContain("docs.google.com");
    });
  });

  describe("Icon", () => {
    it("should render the link icon when mounted.", () => {
      const icon = wrapper.findComponent<typeof UIcon>({ name: "UIcon" });

      expect(icon.props("name")).toBe("i-lucide-link");
    });
  });
});