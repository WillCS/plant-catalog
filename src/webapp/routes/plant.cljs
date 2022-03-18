(ns webapp.routes.plant
  (:require [reagent.core :as r]))

(defn plant-component []
  [:h1 "PLANT"])

(def Plant-component (r/reactify-component plant-component))
