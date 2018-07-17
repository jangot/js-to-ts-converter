import { Node, SyntaxKind, TypeGuards, VariableDeclaration } from "ts-simple-ast";

/**
 * Determines if the given AST Node is a VariableDeclaration of the form:
 *
 *     var self = this;
 *
 *
 * Will return false for the following, however, since this is more than one
 * variable:
 *
 *     var { prop1, prop2 } = this;
 */
export function isThisReferencingVar( node: Node ): node is VariableDeclaration {
	if( !TypeGuards.isVariableDeclaration( node ) ) {
		return false;
	}

	const varDec = node as VariableDeclaration;

	const initializerIsThisKeyword = !!varDec.getInitializerIfKind( SyntaxKind.ThisKeyword );
	const assignedToSingleIdentifier = varDec.compilerNode.name.kind === SyntaxKind.Identifier;

	return initializerIsThisKeyword && assignedToSingleIdentifier;
}