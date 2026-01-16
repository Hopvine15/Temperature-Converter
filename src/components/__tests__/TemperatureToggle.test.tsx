import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TemperatureToggle } from "../TemperatureToggle";

describe("TemperatureToggle", () => {
  it("toggles from celsius to fahrenheit", async () => {
    const user = userEvent.setup();
    const setPrimaryUnit = vi.fn();

    render(
      <TemperatureToggle primaryUnit="celsius" setPrimaryUnit={setPrimaryUnit} />
    );

    await user.click(screen.getByLabelText("Toggle temperature unit"));
    expect(setPrimaryUnit).toHaveBeenCalledWith("fahrenheit");
  });

  it("toggles from fahrenheit to celsius", async () => {
    const user = userEvent.setup();
    const setPrimaryUnit = vi.fn();

    render(
      <TemperatureToggle
        primaryUnit="fahrenheit"
        setPrimaryUnit={setPrimaryUnit}
      />
    );

    await user.click(screen.getByLabelText("Toggle temperature unit"));
    expect(setPrimaryUnit).toHaveBeenCalledWith("celsius");
  });
});
