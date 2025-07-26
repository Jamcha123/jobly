import { useState, useEffect, useRef } from 'react'
import './App.css'
import {motion} from 'framer-motion'
import * as THREE from 'three'
import axios from 'axios'
import $ from 'jquery'

export default function App(){
  useEffect(() => {
    const job = document.getElementById("job")
    const place = document.getElementById("places")
    document.getElementById("form").addEventListener("submit", async (e) => {
      e.preventDefault()
      $("#postings").empty()
      let ans = job.value + " job in " + place.value
      const link = "https://www.googleapis.com/customsearch/v1?key=key&cx=b6cc731b86e3f442c&q=" + ans
      console.log(link)

      const webby = (await axios.get(link))["data"]["items"]

      webby.forEach((e) => {
        let contain = document.createElement("div")
        contain.classList.add("items")

        let title = document.createElement("h1")
        title.innerText = e["title"]
        title.classList.add("title")
        contain.appendChild(title)

        let x = document.createElement("h1")
        x.innerText = e["snippet"]
        x.classList.add("text")
        contain.appendChild(x)

        let y = document.createElement("a")
        y.href = e["link"]
        y.innerText = "job link"
        y.classList.add("link")
        contain.appendChild(y)

        document.getElementById("postings").appendChild(contain)
      })
    })
    document.getElementById("cv1").addEventListener("change", async (e) => {
      e.preventDefault()
      const targets = document.getElementById("cv1")

      let ans = targets.value
      ans = ans.split(".")
      if(ans[1] != "pdf"){
        alert(targets.value + " is not a pdf file, the CV has to be a PDF")
      }else{
        const files = targets.files[0]

        const reader = new FileReader()

        const items = new Promise((resolve) => {
          reader.onload = (event) => {
            const results = event.target.result
            resolve(results)
          }
          reader.readAsText(new Blob([files]))
        })
        const data = await items

        const link = "https://obj-tu6dy325kq-uc.a.run.app?text=" + data
        const webby = await axios.get(link)

        let x = document.createElement("a")
        x.href = URL.createObjectURL(new Blob([webby["data"]]))
        x.download = "/improvedCV.docx"
        x.click()

        console.log(webby["data"])
      }
    })
  })
  return(
    <div className="relative w-[100%] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
      <div id="postings" className="relative w-[100%] max-h-[85vh] h-[85vh] min-h-[85vh] overflow-y-scroll gap-[10px] m-auto p-[0] bg-transparent grid-cols-1 grid-rows-1 grid md:grid md:grid-cols-2 md:grid-rows-2 ">

      </div>
      <div className="relative w-[75%] h-[15vh] m-auto p-[0] bg-transparent flex flex-row align-middle justify-center text-center ">
        <div className="relative w-[15%] h-[100%] bg-transparent m-auto p-[0] flex flex-col align-middle justify-center text-center ">
          <motion.label initial={{scale: 1}} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", duration: 1}} htmlFor='cv1' className="relative cursor-pointer w-[100%] h-[50%] m-auto p-[0] bg-transparent text-center flex-col flex align-middle justify-center text-xl text-black rounded-full border-black border-[2px] " >Edit CV</motion.label>
          <input type="file" name="cv1" id="cv1" className="hidden" />
        </div>
        <form action="" method="GET" id="form" className="relative w-[85%] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
          <div className="relative w-[100%] h-[50%] m-auto p-[0] flex flex-row align-middle justify-evenly text-center ">
            <input type="text" id="job" placeholder="Enter a Job to find" className="relative w-[60%] h-[100%] m-auto p-[0] bg-transparent border-slate-800 border-[2px] rounded-full text-2xl text-black text-center   " />
            <select name="places" id="places" className="relative w-[15%] h-[100%] m-auto p-[0] bg-transparent border-[2px] border-slate-600 rounded-full text-black text-center text-xl ">
              <option value="Sweden">Sweden</option>
              <option value="United-States">United States</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="United-Kingdom">United Kingdom</option>
              <option value="Italy">Italy</option>
              <option value="Spain">Spain</option>
              <option value="Australia">Australia</option>
              <option value="Japan">Japan</option>
              <option value="Taiwan">Taiwan</option>
              <option value="China">China</option>
              <option value="Canada">Canada</option>
            </select>
            <motion.button id="submit" type="submit" className="relative w-[15%] h-[100%] m-auto p-[0] cursor-pointer bg-transparent flex flex-col align-middle justify-center text-center text-black text-xl border-black rounded-full border-[2px]  " >
              Submit
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  )
}
