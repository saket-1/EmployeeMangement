import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import ListEmployeeComponent from "./ListEmployeeComponent";

import axios from 'axios';

jest.mock("axios");

function Wrapper({ children }) {
    return (
        <BrowserRouter>
          {children}
        </BrowserRouter>
    );
  }

  const employeeData = {
    firstName : "Saket",
    lastName : "Agarwal",
    emailId : "saket@gmail.com",
    id : 1
  };

describe("testing ListEmployee", () => {

    test("testing delete employee feature", async () => {
      axios.get.mockResolvedValue({data : [ employeeData ]});
      render(<ListEmployeeComponent />, { wrapper: Wrapper });
      const listEmployeeElement = screen.getByText("List Employees");
      expect(listEmployeeElement).toBeInTheDocument();
      axios.delete.mockResolvedValueOnce(true)
      const deleteButton = await screen.findByText('Delete');
      fireEvent.click(deleteButton);
      expect(axios.delete).toHaveBeenCalledTimes(1);
    });
})



