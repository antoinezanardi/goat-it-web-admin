import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@/App.vue";

describe("App Component", () => {
  let wrapper: ReturnType<typeof mountSuspended>;

  async function mountAppComponent(): Promise<ReturnType<typeof mountSuspended>> {
    return await mountSuspended(App, {
      shallow: true,
    });
  }

  beforeEach(async() => {
    wrapper = await mountAppComponent();
  });

  it("should render the app component when mounted.", async() => {
    console.log(wrapper.html());
    expect(wrapper.exists()).toBe(true);
  });
});