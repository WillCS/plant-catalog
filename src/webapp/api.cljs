(ns webapp.api
  (:require [axios]
            [webapp.plant :refer [get-plant-entry-from-obj]]))

(defn get-plant-list []
  (-> (axios/get "http://localhost:3000/plants")
      (.then #(map get-plant-entry-from-obj (js->clj (.-data %))))))
