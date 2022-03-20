(ns webapp.components.bar
  (:require [reagent.core :as r]
            [webapp.components.hamburger :refer(hamburger)]))

(defn bar []
  [:div#topbar
   [hamburger]])
 