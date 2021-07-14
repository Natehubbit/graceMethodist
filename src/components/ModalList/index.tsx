import { FC } from "react";
import { IModal, UserType } from "../../@types/index";
import { ReactComponent as Spinner } from "../../assets/images/spinner.svg";

interface ModalListProps extends IModal {
  onClose?: () => void;
}
const ModalList: FC<ModalListProps> = ({
  header,
  show,
  data,
  onClose,
  loading,
}) => {
  if (!show) return null;
  const isAdmins = header === "Admins";
  const renderData = () => {
    const hasData = data.length > 0;
    if (!hasData && !loading)
      return (
        <p className="text-gray-500">
          No {header} data found...
        </p>
      );
    if (isAdmins) {
      const result = data as UserType[];
      return result.map((r) => {
        return (
          <li
            key={r.email}
            className="mb-2 flex items-center cursor-pointer hover:bg-blue-50"
          >
            <span className="rounded-full bg-blue-500 h-3 w-3 mr-2 block" />
            <div>
              <span className="text-lg">{r.email}</span>
              <br />
              <span>{r.username}</span>
            </div>
          </li>
        );
      });
    } else {
      const result = data as string[];
      return result.map((r) => {
        return (
          <li
            key={r}
            className="mb-2 flex items-center cursor-pointer hover:bg-blue-50"
          >
            <span className="rounded-full bg-blue-500 h-3 w-3 mr-2 block" />
            <span className="text-lg">{r}</span>
          </li>
        );
      });
    }
  };
  return (
    <div className="fixed h-screen top-0 flex justify-center w-screen bg-black left-0 p-20 bg-opacity-40">
      <div className="bg-white p-5 w-1/2 relative h-full">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xs hover:opacity-50"
        >
          &#10006;
        </button>
        <h1 className="text-xl font-bold">{header}</h1>
        {loading && (
          <div className="flex flex-1 flex-col justify-center items-center p-10">
            <Spinner className="h-24" />
          </div>
        )}
        <ul className="my-5">{renderData()}</ul>
      </div>
    </div>
  );
};

export default ModalList;
