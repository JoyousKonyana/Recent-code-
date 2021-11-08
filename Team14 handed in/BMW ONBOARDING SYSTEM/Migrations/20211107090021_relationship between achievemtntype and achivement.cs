using Microsoft.EntityFrameworkCore.Migrations;

namespace BMW_ONBOARDING_SYSTEM.Migrations
{
    public partial class relationshipbetweenachievemtntypeandachivement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Achievement_AchievementTypeID",
                table: "Achievement",
                column: "AchievementTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_Achievement_AchievementType_AchievementTypeID",
                table: "Achievement",
                column: "AchievementTypeID",
                principalTable: "AchievementType",
                principalColumn: "AchievementTypeID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Achievement_AchievementType_AchievementTypeID",
                table: "Achievement");

            migrationBuilder.DropIndex(
                name: "IX_Achievement_AchievementTypeID",
                table: "Achievement");
        }
    }
}
