# media-viewer-container

A media viewer container with a configurable layout, featuring a panel with a content box which contains media - either an embed object, video, image, and/or html canvas. it has optional slots for sidebar(s) [right,left] and [top,bottom]. Bars can contain action menu items (when clicked they run a function) or informational items such as hints and titles. The viewer calls generic load and render functions on it's media item to support multiple media formats. The viewer's media item(s) may be an individual media item, a list of media items, or a list of media versions (versions of the same item). When necessary  it handles transitions and navigation between items. A media item can have versions. The viewer displays version information and supports CRUD operations on media items and media versions, as well as fork, clone, rebase, and merge operations on media items and versions. 

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/media-viewer-container.git
cd media-viewer-container
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
