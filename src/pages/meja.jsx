import * as React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import Header from "../partial/header"
import Sidebar from "../partial/sidebar"

export default function Meja(){
  const [dataMeja, setDataMeja] = useState([])

  const [createData, setCreateData] = useState({
    no_meja: "",
  })

  const [updateData, setUpdateData] = useState({ 
    id_meja: "",
    nama_meja: "",
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
      .get("http://localhost:5292/api/Meja/getAll")
      .then((response) => {
        const dataApi = response.data.data
        setDataMeja(dataApi)
      })
      .catch((err) => console.log(err));
  };

  const handleCreate = async () => {
    try {
      
      if (createData.no_meja !== '') {
          
        await axios
          .post("http://localhost:5292/api/Meja/postMeja", createData)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => console.log(err));
          console.log("Data berhasil ditambah:", createData);
          readData();
          setCreateData({
            no_meja: "",
          })
          setShowAlert(true)
          setAlertType("create")

        } else {
          alert("Anda belum memasukkan No Meja")
        }
      } catch (error) {
        console.error("Error creating data:", error);
      }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log("Update Data:", updateData.no_meja);

      await axios
        .put(`http://localhost:5292/api/Meja/updateMeja/${updateData.id_meja}`, updateData)
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
          .delete(`http://localhost:5292/api/Meja/deleteMeja/${deleteId}`)
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
        id_meja: item.id_meja,
        no_meja: item.no_meja,
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
                  <h5 className="card-title">Data Meja</h5>
                  <button type="button" className="btn btn-sm btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalTambah">
                    <span className="text-white fw-bold"> Tambah Data </span>
                  </button>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nomor Meja</th>
                        <th scope="col">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                    {dataMeja.map((data, index) => (
                        <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.no_meja}</td>
                        <td>
                            <button type="button" className="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdit" onClick={() => selectedItem(data)}>
                            <i className="bi bi-pen"></i>
                            </button>
                            <button type="button" className="btn btn-sm btn-danger mx-3" data-bs-toggle="modal" data-bs-target="#modalDelete"onClick={() => setDeleteId(data.id_meja)} >
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
          <h5 className="modal-title fw-bold fs-4">Tambah Data</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">

          <form className="row g-3">
            <div className="col-12">
              <label htmlFor="nama" className="form-label">Nomor Meja</label>
              <input type="text" className="form-control" value={createData.no_meja} name="no_meja" 
              onChange={(e) => setCreateData({...createData, no_meja: e.target.value})} required />
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
          <h5 className="modal-title fw-bold fs-4">Edit Meja</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">

          <form className="row g-3">
            <div className="col-12">
              <label htmlFor="nama" className="form-label">Nomor Meja</label>
              <input type="text" className="form-control" value={updateData.no_meja} name="no_meja" 
              onChange={(e) => setUpdateData({...updateData, no_meja: e.target.value})}/>
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