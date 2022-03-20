(ns webapp.core
  (:require [reagent.core :as r  :refer [atom]]
            [react-router-dom    :refer (Routes Route Link) :rename {BrowserRouter Router}]
            [webapp.routes.list  :refer [List-component]]
            [webapp.routes.plant :refer [Plant-component]]
            [webapp.components.button :refer [button]]
            [webapp.components.bar :refer [bar]]))

;; define your app data so that it doesn't get over-written on reload

(defonce app-state (atom {:text "Hello world!"}))

(defn base-component []
  [:> Router
   [bar]
   (r/create-element Link #js{:to "/plant"} (r/as-element [button "plant"]))
   (r/create-element Link #js{:to "/"} (r/as-element [button "list"]))
   [:> Routes
    [:> Route {:path "/"
               :element (r/create-element List-component)}]
    
    [:> Route {:path "/plant"
               :element (r/create-element Plant-component)}]]])

(defn start []
  (r/render-component [base-component]
                      (. js/document (getElementById "app"))))

(defn ^:export init []
  ;; init is called ONCE when the page loads
  ;; this is called in the index.html and must be exported
  ;; so it is available even in :advanced release builds
  (start))

(defn stop []
  ;; stop is called before any code is reloaded
  ;; this is controlled by :before-load in the config
  (js/console.log "stop"))
