(ns webapp.routes.list
  (:require [reagent.core :as r :refer (atom)]
            [webapp.api :refer (get-plant-list)]))

(def list-style
  {:display         "flex"
   :flex-direction  "row"
   :justify-content "space-around"})

(defn list-row [plant]
  [:div {:style list-style}
   [:p (:species plant)]
   [:p "name2"]
   [:p "name3"]])

(defn list-component []
  (let [plants (atom [])]
    (when (== (count @plants) 0)
      (-> (get-plant-list)
          (.then #(reset! plants %))
          (.catch #(prn %))))
    (fn []
      [:div
       (for [plant @plants]
         ^{:key (:plant-id plant)} [list-row plant])])))

(def List-component (r/reactify-component list-component))
