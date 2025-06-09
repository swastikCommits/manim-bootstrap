from manim import *

class GeneratedScene(Scene):
    def construct(self):
        circle = Circle(color=BLUE, fill_opacity=0.5)
        square = Square(color=GREEN, fill_opacity=0.5)

        self.play(Create(circle))
        self.wait(1)
        self.play(Transform(circle, square), run_time=2)
        self.wait(1)
        self.play(FadeOut(square))