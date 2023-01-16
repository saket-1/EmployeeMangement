import HeaderComponent from "./HeaderComponent";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


function Wrapper({ children }) {
    return (
        <BrowserRouter>
          {children}
        </BrowserRouter>
    );
  }
describe("testing header", () => {

    test("testing navbar element", () => {
      render(<HeaderComponent />, { wrapper: Wrapper });
      const headerElement = screen.getByText("Employee Management Application");
      expect(headerElement).toBeInTheDocument();
    });
})