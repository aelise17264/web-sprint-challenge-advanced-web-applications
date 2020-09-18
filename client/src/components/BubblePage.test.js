import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import App from '../App';
import {fetchColors as mockFetchColors} from '../api/fetchColors';

jest.mock('../api/fetchColors')

const colorData = {
  colors:[{
  color: "aliceblue",
  code: {
    hex: "#f0f8ff"
  },
  id: 1
},
{
  color: "limegreen",
  code: {
    hex: "#99ddbc"
  },
  id: 2
},
{
  color: "aqua",
  code: {
    hex: "#00ffff"
  },
  id: 3
},
{
  color: "aquamarine",
  code: {
    hex: "#7fffd4"
  },
  id: 4
},
{
  color: "lilac",
  code: {
    hex: "#9a99dd"
  },
  id: 5
},
{
  color: "softpink",
  code: {
    hex: "#dd99ba"
  },
  id: 6
}
]}

test("Fetches data and renders the bubbles", async () => {
  render (<App/>)
  mockFetchColors.mockResolvedValue(colorData)
  await render(<BubblePage/>)
waitFor(() => screen.findAllByTestId(/colors/i))
expect(screen.findAllByTestId(/colors/i)).toBeTruthy()
});

