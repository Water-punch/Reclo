import { create } from 'zustand'
import { useItemsStore } from './items'
import { useUserStore } from './user'
import { usechatStore } from './chat'
import { useTestStore } from './test'

const useIndexStore = create((...a) => ({
    ...useItemsStore(...a),
    ...useTestStore(...a),
    ...useUserStore(...a),
    ...usechatStore(...a),
}))