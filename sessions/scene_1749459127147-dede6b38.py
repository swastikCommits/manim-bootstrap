from manim import *

class GeneratedScene(Scene):
    def construct(self):
        self.camera.background_color = WHITE
        thanks = Text("Thanks,", font_size=48, color=BLACK).move_to(UP * 1.5)
        harkirat = Text("Harkirat Singh", font_size=60, color=BLUE).move_to(ORIGIN)
        for_the = Text("for the", font_size=48, color=GRAY).next_to(harkirat, DOWN, buff=0.2)
        project = Text("Project", font_size=60, color=GREEN).next_to(for_the, DOWN, buff=0.2)
        idea = Text("Idea!", font_size=72, color=RED).next_to(project, DOWN, buff=0.3)

        self.play(Write(thanks), run_time=1)
        self.play(Write(harkirat), run_time=2)
        self.play(Write(for_the), run_time=1)
        self.play(Write(project), run_time=1.5)
        self.play(Write(idea), run_time=2)

        group = VGroup(thanks, harkirat, for_the, project, idea).move_to(ORIGIN)
        self.wait(1)
        self.play(group.animate.scale(0.8).move_to(ORIGIN))

        circle = Circle(radius=3, color=ORANGE, fill_opacity=0.1).move_to(ORIGIN)
        self.play(Create(circle), run_time=2)
        self.play(Rotate(group, angle=PI/4, about_point=ORIGIN), run_time=2)
        self.wait(2)
        self.play(FadeOut(group, circle))
        self.wait(1)