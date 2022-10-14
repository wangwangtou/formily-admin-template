import React, { useState, useContext } from 'react'
import { GlobalContext } from './context'


export interface TagView {
  path: string,
  name?: string,
  query?: string,
  title?: string,
  meta?: any,
  affix?: boolean
}

interface TagsViewStateDataType {
  visitedViews: TagView[],
  cachedViews: TagView[]
}

interface TagsViewActionsType {
  addVisitedViews: (tags: TagView[]) => void,
  addVisitedView: (tag: TagView) => void,
  removeVisitedView: (tag: TagView) => TagView,
  removeAllVisitedView: () => TagView,
  removeOtherVisitedView: (tag: TagView) => void,
}

interface TagsViewState {
  tagsViewState: TagsViewStateDataType,
  setTagsViewState: React.Dispatch<React.SetStateAction<TagsViewStateDataType>>,
  tagsViewActions: TagsViewActionsType,
}


const initialState: TagsViewStateDataType = {
  visitedViews: [],
  cachedViews: []
}

export function createTagsViewState(): TagsViewState {
  const [ tagsViewState, setTagsViewState ] = useState(initialState)
  const tagsViewActions: TagsViewActionsType = {
    addVisitedViews(tags) {
      const existsPaths = tagsViewState.visitedViews.map(v => v.path)
      const insertTags = tags.filter(tag => !existsPaths.includes(tag.path))
      if (insertTags.length > 0) {
        setTagsViewState({
          visitedViews: [].concat(tagsViewState.visitedViews, insertTags),
          cachedViews: tagsViewState.visitedViews,
        })
      }
    },
    addVisitedView(tag) {
      const existTag = tagsViewState.visitedViews.find(v => v.path == tag.path)
      if (!existTag) {
        setTagsViewState({
          visitedViews: [].concat(tagsViewState.visitedViews, [tag]),
          cachedViews: tagsViewState.visitedViews,
        })
      }
    },
    removeVisitedView(tag) {
      const existTagIdx = tagsViewState.visitedViews.findIndex(v => v.path == tag.path)
      if (existTagIdx >= 0) {
        const ref = tagsViewState.visitedViews.slice()
        ref.splice(existTagIdx, 1)
        setTagsViewState({
          visitedViews: ref,
          cachedViews: tagsViewState.visitedViews,
        })
        return ref[ref.length - 1]
      }
      return tagsViewState.visitedViews[tagsViewState.visitedViews.length - 1]
    },
    removeAllVisitedView: () => {
      const ref = tagsViewState.visitedViews.filter(v => v.affix)
      setTagsViewState({
        visitedViews: ref,
        cachedViews: tagsViewState.visitedViews,
      })
      return ref[ref.length - 1]
    },
    removeOtherVisitedView: (tag: TagView) => {
      const ref = tagsViewState.visitedViews.filter(v => v.affix || v.path == tag.path)
      setTagsViewState({
        visitedViews: ref,
        cachedViews: tagsViewState.visitedViews,
      })
    },
  }
  return {
    tagsViewState,
    setTagsViewState,
    tagsViewActions,
  }
}

export function useTagsViewState(): TagsViewState {
  const {
    tagsViewState,
    setTagsViewState,
    tagsViewActions,
  } = useContext(GlobalContext)
  return {
    tagsViewState,
    setTagsViewState,
    tagsViewActions,
  }
}
