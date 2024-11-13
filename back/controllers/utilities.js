const { response: res, request: req, query, json } = require("express");
const conexion = require("../database");
const bcrypt = require("bcrypt");

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const isClientFormInfoRegistered = (req, res) =>{
    let query = 'select * from usuarios where usuario_id = ?';
    const {id} = req.query;
    conexion.query(query,[id],(err, results) =>{
        if( err || results.length == 0 ){
            res.status(500).json({
                msg:'Error al buscar el cliente',
                err,
            })
            return;
        }
           
        query = 'select * from informacion where cliente_id = ?';
        conexion.query(query,[id],(err,results) =>{
            if( err ){
                res.status(500).json({
                    msg:'Error al buscar la inforamcion del cliente',
                    err:err.message,
                })
                return;
            }
            if( results.length > 0 ){
                res.status(200).json({
                    msg:'El usuario ya cuenta con un registro de su inforamcion',
                    ok:true,
                    cant:results.length
                })
                return;
            }
            res.status(200).json({
                msg:'El usuario aun no cuenta con un registro de su inforamcion',
                ok:false,
                cant:1,
                cant:0
            })
        })       
})
}

const isClientFormExperience = (req, res) =>{
    let query = 'select * from usuarios where usuario_id = ?';
    const {id} = req.query;
    conexion.query(query,[id],(err, results) =>{
        if( err || results.length == 0 ){
            res.status(500).json({
                msg:'Error al buscar el cliente',
                err,
            })
            return;
        }
           
        query = 'select * from experiencia where cliente_id = ?';
        conexion.query(query,[id],(err,results) =>{
            if( err ){
                res.status(500).json({
                    msg:'Error al buscar los logros  del cliente',
                    err:err.message,
                })
                return;
            }
            if( results.length > 0 ){
                res.status(200).json({
                    msg:'El usuario ya cuenta con un registro de su experiencia',
                    ok:true,
                    cant:results.length
                })
                return;
            }
            res.status(200).json({
                msg:'El usuario aun no cuenta con un registro de su experiencia',
                ok:false,
                cant:1,
                cant:0
            })
        })       
})
}
const isClientFormAchievements = (req, res) =>{
    let query = 'select * from usuarios where usuario_id = ?';
    const {id} = req.query;
    conexion.query(query,[id],(err, results) =>{
        if( err || results.length == 0 ){
            res.status(500).json({
                msg:'Error al buscar el cliente',
                err,
            })
            return;
        }
           
        query = 'select * from logros where cliente_id = ?';
        conexion.query(query,[id],(err,results) =>{
            if( err ){
                res.status(500).json({
                    msg:'Error al buscar la experiencia  del cliente',
                    err:err.message,
                })
                return;
            }
            if( results.length > 0 ){
                res.status(200).json({
                    msg:'El usuario ya cuenta con un registro de su logros',
                    ok:true,
                    cant:results.length
                })
                return;
            }
            res.status(200).json({
                msg:'El usuario aun no cuenta con un registro de su logros',
                ok:false,
                cant:1,
                cant:0
            })
        })       
})
}
const isClientVideo = (req, res) =>{
    let query = 'select * from usuarios where usuario_id = ?';
    const {id} = req.query;
    conexion.query(query,[id],(err, results) =>{
        if( err || results.length == 0 ){
            res.status(500).json({
                msg:'Error al buscar el cliente',
                err,
            })
            return;
        }
    if( results[0].video == '' || results[0].video == null ){
        res.status(200).json({
            msg:'El usuario no cuenta aun con un video',
            ok:false,
            cant:0
        })
        return;
    }      
    res.status(200).json({
        msg:'El usuario ya cuenta con un video',
        ok:true,
        cant:1
    })
    return;
           
})
}
const isClientPhoto = (req, res) =>{
    let query = 'select * from usuarios where usuario_id = ?';
    const {id} = req.query;
    conexion.query(query,[id],(err, results) =>{
        if( err || results.length == 0 ){
            res.status(500).json({
                msg:'Error al buscar el cliente',
                err,
            })
            return;
        }
    if( results[0].imagen == '' || results[0].imagen == null ){
        res.status(200).json({
            msg:'El usuario no cuenta aun con una imagen',
            ok:false,
            cant:0
        })
        return;
    }      
    res.status(200).json({
        msg:'El usuario ya cuenta con una imagen',
        ok:true,
        cant:1
    })
    return;
           
})
}

const isInversorInfo = (req, res) =>{
    const {id} = req.query
    let query = 'select * from usuarios where usuario_id = ?'
    conexion.query(query, [id], (err,results) =>{
        if( err  ){
            res.status(500).json({
                msg:'Error al buscar usuario/Usuario no encontrado',
                err
            })
            return
        }
        query = 'select id from informacion_inversionista where id_inversionista = ?';
        conexion.query(query,[id], (err,results) =>{
            if( err  ){
                res.status(500).json({
                    msg:'Error al buscar usuario/',
                    err
                })
                return
            }
            if( results.length == 0 ){
                res.status(200).json({
                    ok:false,
                    cant:0,
                    msg:'El inversor no cuenta con un registro'
                })
                return
            }
                res.status(200).json({
                    ok:true,
                    msg:'El inversor ya cuenta con un registro',
                    cant:1  
                })
        })
    })
}

const isInversorPhoto = (req, res) =>{
    const {id} = req.query
    let query = 'select * from usuarios where usuario_id = ?'
    conexion.query(query, [id], (err,results) =>{
        if( err || results.length == 0 ){
            res.status(500).json({
                msg:'Error al buscar usuario/Usuario no encontrado',
                err
            })
            return
        }
            if( !results[0].imagen ){
                res.status(200).json({
                    msg:'El usuario no cuenta con una selfie',
                    ok:false,
                    cant:0
                })
                return
            }
            res.status(200).json({
                msg:'El usuario ya cuenta con una selfie',
                ok:true,
                cant:1
            })
            return
    })
}

/**
 * Obtener destacados
 */
const getFeatured = (req,res) =>{
    let sql = `SELECT cliente_id, COUNT(*) AS total_inversiones
        FROM inversiones 
        WHERE estado = 1 
        GROUP BY cliente_id
        ORDER BY total_inversiones DESC
        LIMIT 5`;
        conexion.query(sql,(err,results) =>{
            console.log(results);
            if( err ){
                res.status(500)-json({
                    results:[],
                    err
                })
                return
            }
            res.status(200).json({
                results,
            })
        })
    }

    const uploadimageUserCloudinaryHome = async (req, res) => {
        console.log("Archivos recibidos:", req.files);
      
        // Validación de archivo
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
          return res.status(400).json({
            msg: "Sin archivos para subir",
          });
        }
        try {
          // Verificación de extensión del archivo
          console.log("aquiiiiiiiiiiiii", req.files.image);
          const extension = req.files.image.name.split(".").pop();
          if (!["jpg", "png", "jpeg"].includes(extension)) {
            return res
              .status(400)
              .json({ msg: "Extensiones de imagen no permitidas" });
          }
      
          // Destrucción de imagen anterior
          await cloudinary.uploader.destroy(
            `home/${req.params.fieldImage}`,
            (error, result) => {
              if (error)
                console.error("Error al eliminar imagen en Cloudinary:", error);
              else console.log("Imagen eliminada en Cloudinary:", result);
            }
          );
      
          // Subida de nueva imagen
          const { tempFilePath } = req.files.image;
          const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
            public_id: req.params.fieldImage,
            folder: "home",
          });
      
          // Obtiene la URL segura de Cloudinary
          const { secure_url } = uploadResult;
      console.log(req.params.fieldImage);
          // Actualización de la URL de la imagen en la base de datos
          let query = `UPDATE ajustes SET ${req.params.fieldImage} = ? WHERE ajuste_id = 6`;
          conexion.query(query, [secure_url], (err) => {
            if (err) {
              console.error("Error al actualizar imagen en la base de datos:", err);
              return res.status(500).json({
                msg: "Error al guardar la URL de la imagen",
              });
            }
      
            res.status(201).json({
              msg: "Imagen actualizada con éxito",
              url: secure_url,
            });
          });
        } catch (error) {
          console.error("Error al procesar la imagen:", error);
          return res.status(500).json({
            msg: "Error al procesar la imagen",
            error,
          });
        }
      };
      
const getAllImageHome = (req, res) =>{
    let query = 'select image1,image2,image3 from ajustes where ajuste_id = 6';
    conexion.query(query, ( err, results) =>{
        if( err ){
            res.status(500).json({
                err,
                msg:'Error al obtener las imagenes'
            })
            return
        }
        res.status(200).json({
            results,
        })
    })
}

module.exports = {
    isClientFormInfoRegistered,
    isClientFormAchievements,
    isClientFormExperience,
    isClientVideo,
    isClientPhoto,
    isInversorInfo,
    isInversorPhoto,
    getFeatured,
    uploadimageUserCloudinaryHome,
    getAllImageHome
}