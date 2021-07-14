import React, { useState } from "react";
import { IModal } from "../@types/index";
import FormCard from "../components/FormCard";
import Layout from "../components/Layout/";
import ModalList from "../components/ModalList";
import AuthService from "../services/AuthService";
import OptionsService from "../services/OptionsService";

const Add = () => {
  const [org, setOrg] = useState<string | null>(null);
  const [modal, setModal] = useState<IModal>({
    data: [],
    header: undefined,
    show: false,
    loading: false,
    error: undefined,
  });
  const [cat, setCat] = useState<string | null>(null);
  const [admin, setAdmin] = useState<string | null>(null);
  const [loaders, setLoaders] = useState({
    Categories: false,
    Organisations: false,
    Admins: false,
  });
  const onSubmitCategory = async () => {
    setLoaders((l) => ({ ...l, Categories: true }));
    if (!cat) {
      setLoaders((l) => ({ ...l, Categories: false }));
      return alert("You must enter a category name.");
    }
    await OptionsService.addCategory(cat);
    setLoaders((l) => ({ ...l, Categories: false }));
  };
  const onSubmitOrganisation = async () => {
    setLoaders((l) => ({ ...l, Organisations: true }));
    if (!org) {
      setLoaders((l) => ({ ...l, Organisations: false }));
      return alert("You must enter a organisation name.");
    }
    await OptionsService.addOrganisation(org);
    setLoaders((l) => ({ ...l, Organisations: false }));
  };
  const onSubmitAdmin = async () => {
    setLoaders((l) => ({ ...l, Admins: true }));
    if (!admin) {
      setLoaders((l) => ({ ...l, Admins: false }));
      return alert("You must enter an admin name.");
    }
    const res = await AuthService.createAdmin(admin);
    setLoaders((l) => ({ ...l, Admins: false }));
    if (typeof res !== "string") {
      return alert("Admin created successfully!!");
    } else alert(res);
    return alert("Failed to create Admin");
  };
  const onCloseModal = () => {
    setModal({
      data: [],
      header: undefined,
      show: false,
      error: undefined,
      loading: false,
    });
  };
  return (
    <>
      <Layout>
        <div className="grid grid-cols-2 gap-10 flex-1 h-full flex-wrap relative">
          <FormCard
            onView={setModal}
            onSubmit={onSubmitCategory}
            label="Categories"
            title="Add Category"
            setValue={setCat}
            loaders={loaders}
          />
          <FormCard
            onView={setModal}
            onSubmit={onSubmitOrganisation}
            label="Organisations"
            title="Add Organisation"
            setValue={setOrg}
            loaders={loaders}
          />
          <FormCard
            onView={setModal}
            onSubmit={onSubmitAdmin}
            label="Admins"
            title="Add Administrator"
            setValue={setAdmin}
            loaders={loaders}
          />
        </div>
      </Layout>
      <ModalList {...modal} onClose={onCloseModal} />
    </>
  );
};

export default Add;
