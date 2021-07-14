import React, {
  Dispatch,
  FC,
  FocusEventHandler,
  SetStateAction,
} from "react";
import { PlusCircle } from "react-feather";
import Button from "../Button";
import { IModal } from "../../@types/index";
import { FORM_LABELS } from "../../common/constants";
import AdminService from "../../services/AdminService";
import OptionsService from "../../services/OptionsService";

interface FormCardProps {
  title: string;
  label: typeof FORM_LABELS[number];
  loaders: {
    Categories: boolean;
    Organisations: boolean;
    Admins: boolean;
  };
  onView: Dispatch<SetStateAction<IModal>>;
  onSubmit: () => void;
  setValue: (val: string) => void;
}

const FormCard: FC<FormCardProps> = ({
  title,
  label,
  loaders,
  onSubmit,
  onView,
  setValue,
}) => {
  const isAdmin = label === "Admins";
  const loading = (loaders as any)[label];

  const onBlur: FocusEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value } = target;
    setValue(value);
  };
  const onViewList = async () => {
    onView((v) => ({
      ...v,
      show: true,
      loading: true,
      header: label,
    }));
    let data: any[] | null = [];
    if (label === "Categories") {
      data = await OptionsService.loadCategories();
    } else if (label === "Admins") {
      data = await AdminService.getAdmins();
    } else {
      data = await OptionsService.loadOrganizations();
    }
    onView((v) => ({
      ...v,
      data: data || [],
      loading: false,
    }));
  };
  return (
    <div className="flex flex-1 flex-col bg-white px-2 py-4">
      <header className="font-bold text-md mb-5 border-l-4 border-blue-500 pl-2">
        {title}
      </header>
      <div className="flex flex-col px-4 justify-center items-start">
        <input
          placeholder={!isAdmin ? "Name" : "Email"}
          onBlur={onBlur}
          className="border-2 py-1 px-2 rounded-md mb-3 ring-blue-500 focus:ring-2 focus:outline-none"
        />
        <div className="flex items-center mt-4 space-x-1">
          <Button
            loading={loading}
            disabled={loading}
            onClick={onSubmit}
          >
            <PlusCircle className="mr-1" size={15} /> Add
          </Button>
          <Button onClick={onViewList} mode="outline">
            View {label}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
