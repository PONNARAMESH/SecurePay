import { act, render, waitFor } from "@testing-library/react-native";
import ContactsScreen from "../../src/screens/ContactsScreen";
import { useFetchUserInfoById } from "../../src/hooks";
import { useSelector, useDispatch } from "react-redux";

import * as Redux from "react-redux";
import { GET_ALL_MY_CONTACTS_REQUEST_SUCCESS } from "../../src/redux/actionTypes";
import { createStore } from "redux";
import { TRootState } from "../../src/redux/store";
import { getAllMyContactsRequestSuccessAction } from "../../src/redux/actions/contacts";
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => jest.fn()),
  }));
// jest.mock("react-redux", () => ({
//   useSelector: jest.fn(),
//   useDispatch: jest.fn(() => jest.fn()),
// }));
const mockedUseSelector = useSelector as jest.MockedFunction<
  typeof useSelector
>;
const mockedUseDispatch = useDispatch as jest.MockedFunction<
  typeof useDispatch
>;

// const dispatch = mockedUseDispatch.mockReturnValue((actionType, payload) => jest.fn(actionType, payload));

jest.mock("../../src/hooks/useFetchUserInfoById.tsx");
const mockedUseFetchUserInfoById = useFetchUserInfoById as jest.MockedFunction<
  typeof useFetchUserInfoById
>;

const mockLoggedInUserInfo = {
  displayName: "John Carter",
  email: "test6@gmail.com",
  emailVerified: false,
  isAnonymous: false,
  phoneNumber: null,
  photoURL: null,
  providerId: "firebase",
  uid: "vFmecoGLUfTz65dIVKre73Nqp0D2",
};

const mockUserAccountInfo = {
  accountNumber: "5010100001000",
  balance: 10691,
  contactsList: ["9876543210", "9876543215"],
  displayName: "John Carter",
  email: "test6@gmail.com",
  emailVerified: false,
  isAnonymous: false,
  phoneNumber: "9876543216",
  providerId: "firebase",
  uid: "vFmecoGLUfTz65dIVKre73Nqp0D2",
};

const mockContactsList = [
  {
    displayName: "Potronics",
    email: "Potronics@gmail.com",
    id: " FhfV9JC6hj",
    parentId: "9876543216",
    phoneNumber: "9876543234",
  },
  {
    displayName: "ramesh",
    email: "ramesh@gmail.com",
    id: " Ysm15iKceX",
    parentId: "9876543216",
    phoneNumber: "9876543215",
  },
  {
    displayName: "Tom Cruise",
    email: "cruise@gmail.com",
    id: " wmZmOMOxCQ",
    parentId: "9876543216",
    phoneNumber: "9876543220",
  },
];

const props = {
  navigation: {
    navigate: jest.fn(),
  },
};

const mockedInitialStore = {
  user: {
    data: { ...mockLoggedInUserInfo },
    error: null,
  },
  contacts: {
    isFetchingMyContacts: false,
    myContacts: [],
  },
};


// describe("ContactsScreen-without-data", () => {
//   beforeEach(() => {
//     // mockedUseSelector.mockReturnValueOnce({
//     //   ...mockInitialStore,
//     // });
//     jest.spyOn(Redux, 'useSelector').mockReturnValue({
//       ...mockInitialStore,
//     });
//     act(() => {
//       mockedUseFetchUserInfoById.mockReturnValueOnce({
//         userAccountInfo: { ...mockUserAccountInfo },
//         isFetchingAccountInfo: false,
//       });
//     });
//   });

//   test("It should render successfully", () => {
//     const { debug } = render(<ContactsScreen {...props} />);
//   });

//   test("When redux-store return 'myContacts' as EMPTY ARRAY i.e. [], this page should display some message without contacts list", () => {
//     const { debug, queryByTestId } = render(<ContactsScreen {...props} />);
//     const textTagForMessageOfEmptyContactsList = queryByTestId(
//       "messageForEmptyContactsList"
//     );
//     const iconTagForEmptyContactList = queryByTestId(
//       "iconForEmptyContactsList"
//     );
//     const buttonForAddNewContact = queryByTestId("addNewContactButton");

//     expect(textTagForMessageOfEmptyContactsList).toBeVisible();
//     expect(iconTagForEmptyContactList).toBeVisible();
//     expect(buttonForAddNewContact).toBeVisible();
//   });
// });

describe("ContactsScreen-with-data", () => {
  // beforeEach(() => {
    
  //   jest.spyOn(Redux, 'useSelector').mockImplementation( () => ({
  //     user: {
  //       data: { ...mockLoggedInUserInfo },
  //       error: null,
  //     },
  //     contacts: {
  //       isFetchingMyContacts: false,
  //       myContacts: mockContactsList,
  //     },
  //   }));
  // });

  test("When redux-store return 'myContacts' as NON-EMPTY ARRAY i.e. [{...}, {...}], this page should display some contacts list", async () => {
    // (useSelector as jest.Mock).mockImplementation( () => ({
    //       user: {
    //         data: { ...mockLoggedInUserInfo },
    //         error: null,
    //       },
    //       contacts: {
    //         isFetchingMyContacts: false,
    //         myContacts: mockContactsList,
    //       },
    //   }));
    
    act(() => {
      mockedUseFetchUserInfoById.mockReturnValueOnce({
        userAccountInfo: { ...mockUserAccountInfo },
        isFetchingAccountInfo: false,
      });
    });
    
    const mockStore = createStore<Partial<TRootState>, any, any, any>((state={}, action) => {
      console.log(">>>>>>>>>>>stored-got-triggered", {state, action})
      if (action.type === GET_ALL_MY_CONTACTS_REQUEST_SUCCESS) {
        return {
          ...state,
          ...mockedInitialStore,          
          contacts: {
            isFetchingMyContacts: false,
            myContacts: mockContactsList,
          },
        };
      }
      return {
        ...state,
        ...mockedInitialStore,
      };;
    });
    
    const { debug, queryByTestId } = render(
      <Redux.Provider store={mockStore}>
        <ContactsScreen {...props} />
      </Redux.Provider>
    );
    const textTagForMessageOfEmptyContactsList = queryByTestId(
      "messageForEmptyContactsList"
    );
    const iconTagForEmptyContactList = queryByTestId(
      "icon ForEmptyContactsList"
    );
    await act(() => {
      mockStore.dispatch(getAllMyContactsRequestSuccessAction(mockContactsList))
    })
    waitFor(() => expect(textTagForMessageOfEmptyContactsList).not.toBeVisible());
    waitFor(() => expect(iconTagForEmptyContactList).not.toBeVisible());
    // console.log(debug());
  });
});
