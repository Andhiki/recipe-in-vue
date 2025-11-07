<script setup lang="ts">
import Container from "@/components/Container.vue";
import Navbar from "@/components/Navbar.vue";
import RecipeList from "@/components/RecipeList.vue";
import { CookingPotIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
</script>

<template>
  <Navbar />
  <Container>
    <div class="h-13" />
    <h1 class="text-4xl font-bold my-8">find your favorite recipe</h1>
    <h2 class="text-2xl font-bold my-4">Your own recipe</h2>
    <div>
      <Empty v-if="true">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CookingPotIcon />
          </EmptyMedia>
          <EmptyTitle>No recipes yet</EmptyTitle>
          <EmptyDescription>Add your first recipe</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Add recipe</Button>
        </EmptyContent>
      </Empty>
    </div>

    <h2 class="text-2xl font-bold my-4">Other recipes</h2>
    <RecipeList />
  </Container>
</template>

