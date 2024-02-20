import * as React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import Header from "../partial/header"
import Sidebar from "../partial/sidebar"


export default function Menu(){
  const [menu, setMenu] = useState([]);

  const [createMenu, setCreateMenu] = useState({
    nama_menu: "",
    harga_menu: "",
    stok_menu: "" 
    });

  const [updateMenu, setUpdateMenu] = useState({ 
    id_menu: "",
    nama_menu: "",
    harga_menu: "",
    stok_menu: ""
    });

  const [deleteId, setDeleteId] = useState(null);

  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState(null)

  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
        setAlertType(null);
      }, 5000);
    }
    
    readMenu();
        
    return () => {
        clearTimeout(timer);
      };

  }, [showAlert]);
  
  const readMenu = async () => {
    await axios
      .get("http://localhost:5000/getAllMenu")
      .then((response) => {
        const menuApi = response.data
        setMenu(menuApi)
      })
      .catch((err) => console.log(err));
  };


  const handleCreate = async () => {
    try {
        await axios
        .post("http://localhost:5000/postMenu", createMenu)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

        if (createMenu.harga_menu !== "" && createMenu.nama_menu !== "" && createMenu.stok_menu !== '') {
            console.log("Data berhasil ditambah:", createMenu);
            readMenu();
            setCreateMenu({
              nama_menu: "",
              harga_menu: "",
              stok_menu: "" 
            })

            setShowAlert(true)
            setAlertType("create")
        } else {
          alert("Masukkan data yang lengkap")
        }

        
        // setShowAlert(true)
      } catch (error) {
        console.error("Error creating data:", error);
      }
  }


  const handleUpdate = async (e) => {
    
    try {
      console.log("Update Data:", updateMenu.harga_menu, "dengan stok", updateMenu.stok_menu);

      await axios
        .get(`http://localhost:5000/updateMenu/:${updateMenu.id_menu}`, updateMenu)
        .then((response) => console.log(response))

      readMenu();
      console.log("Data berhasil diubah:", updateMenu);

      setShowAlert(true);
      setAlertType("update")
      
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Update Data Gagal");
    }
  };

  const handelDelete = async () => {
    try {
        await axios
          .delete(`http://localhost:5000/deleteMenu/${deleteId}`)
          .then((response) => {
            if (response.data.status === 500) {
            console.log(response.data.message)
            } else {
              console.log("Data id berhasil dihapus:", deleteId);

            }
          });

        readMenu();
        setDeleteId(null)

        setShowAlert(true)
        setAlertType("delete")
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Delete Data Gagal");
      }
  }


  const selectedItem = async (item) => {
    console.log(`data yang akan diedit ${item}`);
    setUpdateMenu({
        id_menu: item.id_menu,
        nama_menu: item.nama_menu,
        harga_menu: item.harga_menu,
        stok_menu: item.stok_menu
      });
  }


return(
    <>
    <Header />
    <Sidebar />
  <main id="main" className="main">
    
    <section className="section">
      <div className="row">

        <div className="col-lg-12">
        {showAlert && (
            <div className={`alert alert-info mt-3`} role="alert">
                {alertType === 'create' ? 'Menu berhasil dibuat!!' : (alertType === 'update' ? 'Menu berhasil diupdate!' : 'Menu berhasil dihapus!')}
            </div>
          )}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Data Menu</h5>
              <button type="button" className="btn btn-sm btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalTambah">
                <span className="text-white fw-bold"> Tambah Data </span>
              </button>
              <table className="table table-striped">
                <thead >
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama Menu</th>
                    <th scope="col">Harga Menu</th>
                    <th scope="col">Stok Menu</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                    {menu.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.nama_menu}</td>
                        <td>Rp.{data.harga_menu}</td>
                        <td>{data.stok_menu}</td>
                        <td>
                            <button type="button" className="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdit" onClick={() => selectedItem(data)}>
                            <i className="bi bi-pen"></i>
                            </button>
                            <button type="button" className="btn btn-sm btn-danger mx-3" data-bs-toggle="modal" data-bs-target="#modalDelete" onClick={()=> setDeleteId(data.id_menu)}>
                            <i className="bi bi-trash"></i>
                            </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
  {/* <!-- End #main --> */}

  {/* <!-- MODAL TAMBAH --> */}
  <div className="modal fade" id="modalTambah" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fw-bold fs-4">Tambah Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">

          <form className="row g-3">
            <div className="col-12">
              <label htmlFor="nama" className="form-label">Nama Menu</label>
              <input type="text" className="form-control" value={createMenu.nama_menu} name="nama_menu" 
              onChange={(e) => setCreateMenu({...createMenu, nama_menu: e.target.value})} required/>
            </div>
            <div className="col-12">
              <label htmlFor="harga" className="form-label">Harga Menu</label>
              <input type="number" className="form-control" value={createMenu.harga_menu} name="harga_menu" 
              onChange={(e) => setCreateMenu({...createMenu, harga_menu: e.target.value})} required/>
            </div>
            <div className="col-12">
              <label htmlFor="stok" className="form-label">Stok Menu</label>
              <input type="number" className="form-control" value={createMenu.stok_menu} name="stok_menu" 
              onChange={(e) => setCreateMenu({...createMenu, stok_menu: e.target.value})} required/>
            </div>

            <div className="d-flex justify-content-end my-3">
              <button type="button" className="btn btn-primary" onClick={handleCreate}>Simpan</button>
            </div>
          </form>
          {/* <!-- End Form --> */}
        </div>
      </div>
    </div>
  </div>
  {/* <!-- End MODAL TAMBAH --> */}

  {/* <!-- MODAL EDIT --> */}
  <div className="modal fade" id="modalEdit" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fw-bold fs-4">Edit Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">

          <form className="row g-3">
            <div className="col-12">
              <label htmlFor="nama" className="form-label">Nama Menu</label>
              <input type="text" className="form-control" value={updateMenu.nama_menu} name="nama" 
              onChange={(e) => setUpdateMenu({...updateMenu, nama_menu: e.target.value} )} />
            </div>
            <div className="col-12">
              <label htmlFor="harga" className="form-label">Harga Menu</label>
              <input type="number" className="form-control" value={updateMenu.harga_menu} name="harga" 
              onChange={(e) => setUpdateMenu({...updateMenu, harga_menu: e.target.value} )} />
            </div>
            <div className="col-12">
              <label htmlFor="stok" className="form-label">Stok Menu</label>
              <input type="number" className="form-control" value={updateMenu.stok_menu} name="stok" 
              onChange={(e) => setUpdateMenu({...updateMenu, stok_menu: e.target.value} )} />
            </div>

            <div className="d-flex justify-content-end my-3">
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Simpan</button>
            </div>
          </form>
          {/* <!-- End Form --> */}
        </div>
      </div>
    </div>
  </div>
  {/* <!-- End MODAL TAMBAH --> */}

  {/* <!-- MODAL DELETE --> */}
  <div className="modal fade" id="modalDelete" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fw-bold fs-4">Delete Manajer</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <span>Yakin untuk menghapus data ini?</span>
          <div className="d-flex justify-content-end my-3 gap-3">
            <button type="submit" className="btn btn-danger" onClick={handelDelete}>Hapus</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Batal</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* <!-- End MODAL TAMBAH --> */}
   </>
    )}