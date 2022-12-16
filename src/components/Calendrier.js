import { getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';

function Calendrier() {
  const params = useParams();
  const [planning, setPlanning] = useState(Array)
  const [clients, setClient] = useState(Array);

  const searchClient = useCallback(() => {
    let q = null;
    let fetchDataBis
    let dataClientBis = []
    planning.forEach(elem => {
      q = query(collection(db, "usersCollection"), where("id", "==", elem.idClient));
      fetchDataBis = async () => {
        const docSnap = await getDocs(q);
        return docSnap;
      }

      fetchDataBis().then((res) => {
        res.forEach((r) => {
          dataClientBis.push(r.data());
        })
      }).catch((err) => {
        console.log(err)
      })
    })
    setClient(dataClientBis)
  }, [planning])

  useEffect(() => {
    const q = query(collection(db, "planning"), where("idDocteur", "==", params.idDocteur));
    const fetchData = async () => {
      const docSnap = await getDocs(q);
      return docSnap
    }
    let listBis = []
    fetchData().then((res) => {
      res.forEach((r) => {
        listBis.push(r.data());
      })
      setPlanning(listBis);
      searchClient()
    }).catch((err) => {
      console.log(err)
    })
  }, [params, searchClient])


  return (
    <div>
      {planning.forEach((elem, index) => {
        return (
          <div key={index}>
            <div>{elem.date}</div>
          </div>
        )
      })}
      {clients.forEach((elem, index) => {
        return (
          <div key={index}>
            <div>{elem.id}</div>
          </div>
        )
      })}
    </div>
  );

}

export default Calendrier