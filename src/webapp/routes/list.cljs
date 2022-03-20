(ns webapp.routes.list
  (:require [reagent.core :as r]))

(def list-style
  {:display         "flex"
   :flex-direction  "row"
   :justify-content "space-around"})

(defn list-row [plant]
  [:div {:style list-style}
   [:p "name"]
   [:p "name2"]
   [:p "name3"]])

(defn list-component []
  [list-row "name"])

(def List-component (r/reactify-component list-component))
