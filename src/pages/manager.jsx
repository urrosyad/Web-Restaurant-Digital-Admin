import * as React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import Header from "../partial/header"
import Sidebar from "../partial/sidebar"

export default function Manajer(){
  const [dataManager, setDataManager] = useState([])

  const [createData, setCreateData] = useState({
    nama_manager: "",
    user_manager: "",
    pass_manager: ""
  })

  const [updateData, setUpdateData] = useState({ 
    id_manager: "",
    nama_manager: "",
    user_manager: "",
    pass_manager: ""
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
    
    readData();
        
    return () => {
        clearTimeout(timer);
      };
  }, [showAlert]);


  const readData = async () => {
    await axios
      .get("http://localhost:5292/api/Manager/getAll")
      .then((response) => {
        const dataApi = response.data.data
        setDataManager(dataApi)
      })
      .catch((err) => console.log(err));
  };

  const handleCreate = async () => {
    try {
      
      if (createData.nama_manager !== '' && createData.user_manager !== '' && createData.pass_manager !== '') {
          
        await axios
          .post("http://localhost:5292/api/Manager/postManager", createData)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => console.log(err));
          console.log("Data berhasil ditambah:", createData);
          readData();
          setCreateData({
            nama_manager: "",
            user_manager: "",
            pass_manager: ""
          })

          console.log("isi create manager: " + createData);
          console.log("isi username create manager: " + createData.user_manager);
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
    e.preventDefault();
    try {
      console.log("Update Data:", updateData.nama_manager);

      await axios
        .put(`http://localhost:5292/api/Manager/updateManager/${updateData.id_manager}`, updateData)
        .then((response) => console.log(response))

      readData();
      console.log("Data berhasil diubah:", updateData);

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
          .delete(`http://localhost:5292/api/Manager/deleteManager/${deleteId}`)
          .then((response) => {
            if (response.data.status === 500) {
            console.log(response.data.message)
            } else {
              console.log("Data id berhasil dihapus:", deleteId);

            }
          });

        readData();
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
    setUpdateData({
        id_manager: item.id_manager,
        nama_manager: item.nama_manager,
        user_manager: item.user_manager,
        pass_manager: item.pass_manager
      });
  }

  return(
    <>
    <Header/>
        <Sidebar/>
        <main id="main" className="main">
    
        <section className="section">
          <div className="row">
    
            <div className="col-lg-12">
            {showAlert && (
            <div className={`alert alert-info mt-3`} role="alert">
                {alertType === 'create' ? 'Data Manager berhasil dibuat!!' : (alertType === 'update' ? 'Data Manager berhasil diupdate!' : 'Data Manager berhasil dihapus!')}
            </div>
          )}
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Data Manager</h5>
                  <button type="button" className="btn btn-sm btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalTambah">
                    <span className="text-white fw-bold"> Tambah Data </span>
                  </button>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama Lengkap</th>
                        <th scope="col">Username</th>
                        <th scope="col">Password</th>
                        <th scope="col">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                    {dataManager.map((data, index) => (
                        <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.nama_manager}</td>
                        <td>{data.user_manager}</td>
                        <td>{data.pass_manager}</td>
                        <td>
                            <button type="button" className="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdit" onClick={() => selectedItem(data)}>
                            <i className="bi bi-pen"></i>
                            </button>
                            <button type="button" className="btn btn-sm btn-danger mx-3" data-bs-toggle="modal" data-bs-target="#modalDelete"onClick={() => setDeleteId(data.id_manager)} >
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

      {/* <!-- MODAL TAMBAH --> */}
  <div className="modal fade" id="modalTambah" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fw-bold fs-4">Tambah Manager</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">

          <form className="row g-3">
            <div className="col-12">
              <label htmlFor="nama" className="form-label">Nama Lengkap</label>
              <input type="text" className="form-control" value={createData.nama_manager} name="nama_manager" 
              onChange={(e) => setCreateData({...createData, nama_manager: e.target.value})} required />
            </div>
            <div className="col-12">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" value={createData.user_manager} name="user_manager" 
              onChange={(e) => setCreateData({...createData, user_manager: e.target.value})} required />
            </div>
            <div className="col-12">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" value={createData.pass_manager} name="pass_manager" 
              onChange={(e) => setCreateData({...createData, pass_manager: e.target.value})} required />
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
          <h5 className="modal-title fw-bold fs-4">Edit Manager</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">

          <form className="row g-3">
            <div className="col-12">
              <label htmlFor="nama" className="form-label">Nama Manager</label>
              <input type="text" className="form-control" value={updateData.nama_manager} name="nama_manager" 
              onChange={(e) => setUpdateData({...updateData, nama_manager: e.target.value})}/>
            </div>
            <div className="col-12">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" value={updateData.user_manager} name="user_manager" 
              onChange={(e) => setUpdateData({...updateData, user_manager: e.target.value})}/>
            </div>
            <div className="col-12">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" value={updateData.pass_manager} name="pass_manager" 
              onChange={(e) => setUpdateData({...updateData, pass_manager: e.target.value})}/>
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
  {/* <!-- End MODAL EDIT --> */}


  {/* <!-- MODAL DELETE --> */}
  <div className="modal fade" id="modalDelete" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title fw-bold fs-4">Delete Manager</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <span className="fs-5">Yakin untuk menghapus data ini?</span>
          <div className="d-flex justify-content-end my-3 gap-3">
            <button type="button" className="btn btn-danger" onClick={handelDelete}>Hapus</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Batal</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* <!-- End MODAL TAMBAH --> */}
    </>
  )
}