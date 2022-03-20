(ns webapp.components.hamburger
  (:require [reagent.core :as r :refer (atom)]))

(defn hamburger []
  (let [state (atom false)]
    (fn []
      [:div.hamburger
       {:class (if @state "active" "inactive") :on-click #(swap! state not)}
       [:span]
       [:span]
       [:span]])))
