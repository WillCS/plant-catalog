(ns webapp.routes.list
  (:require [reagent.core :as r]))

(defn list-component []
  [:h1 "LIST"])

(def List-component (r/reactify-component list-component))
