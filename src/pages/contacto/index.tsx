import {useContext, useState} from 'react'
import { UserContext } from "@/context/UserContext"

function index() {
   
    return (
      <section className="bg-blue-950">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
              <div className="lg:col-span-2 lg:py-12">
                  <p className="max-w-xl text-lg text-gray-300">
                      Por consultas llamanos al siguiente numero de telefono o llene el formulario con sus datos.
                  </p>

                  <div className="mt-8">
                      <a href="" className="text-2xl font-bold text-pink-500">
                          0151 475 4450
                      </a>
                  </div>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                  <form action="" className="space-y-4">
                      <div>
                          <label className="sr-only">Nombre</label>
                          <input
                              className="w-full rounded-lg border-gray-200 p-3 text-sm"
                              placeholder="Nombre"
                              type="text"
                              id="name"
                          />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                              <label className="sr-only">Email</label>
                              <input
                                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                  placeholder="Direccion email"
                                  type="email"
                                  id="email"
                              />
                          </div>

                          <div>
                              <label className="sr-only">Telefono (opcional)</label>
                              <input
                                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                  placeholder="Numero de telefono (opcional)"
                                  type="tel"
                                  id="phone"
                              />
                          </div>
                      </div>

                      <div>
                          <label className="sr-only">Mensaje</label>

                          <textarea
                              className="w-full rounded-lg border-gray-200 p-3 text-sm"
                              placeholder="Mensaje"
                              id="message"
                          ></textarea>
                      </div>

                      <div className="mt-4">
                          <button
                              type="submit"
                              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                          >
                              Send Enquiry
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </section>
    )
}

export default index