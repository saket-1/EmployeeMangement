import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddEmployeeComponent from "./AddEmployeeComponent";
import axios from "axios";

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

  describe("testing AddEmployee", () => {

    test("testing navbar element", async () => {
      let newEmployeeData = {
        firstName : "Sachin",
        lastName : "Tendulkar",
        emailId : "sachin@gmail.com"
      }
      axios.get.mockResolvedValue({data : [ employeeData ]});
      render(<AddEmployeeComponent />, { wrapper: Wrapper });
      const firstNameElement = await screen.findByPlaceholderText(/Enter first Name/i);
      fireEvent.change(firstNameElement, {target : { value : "sachin"}});
      const lastNameElement = await screen.findByPlaceholderText(/Enter last Name/i);
      fireEvent.change(lastNameElement, {target : { value : "Tendulkar"}});
      const emailElement = await screen.findByPlaceholderText(/Enter email Id/i);
      fireEvent.change(emailElement, {target : { value : "sachin@gmail.com"}});
      axios.post.mockResolvedValue({data : newEmployeeData});
      const saveButton = await screen.findByText("Submit");
      fireEvent.click(saveButton);
    });

    test("update employee data ", () => {
      jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useParams : () => { return {
              id : "1"      
            }},      
      }));

      axios.get.mockResolvedValue({data : [ employeeData ]});
      render(<AddEmployeeComponent />, { wrapper: Wrapper });
            
    })
})
